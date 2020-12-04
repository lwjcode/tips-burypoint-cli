const _ = require('lodash');
const t = require('@babel/types');

function getSeconds() {
  return parseInt((new Date()).valueOf() / 1000);
}

// 构造属性节点
function buildAttribute(t, id) {
  return t.jsxAttribute(t.jSXIdentifier('data-tip-id'), t.stringLiteral(id));
}

// 构造openElement节点
function buildTipsIdAttributeOpeningElement(path, t, id) {
  let buildTagAttributes = path.node.attributes;
  if (buildTagAttributes.length > 0) {
    // 防止重复绑定
    const attrItem = _.filter(buildTagAttributes, item => {
      return item && item.name && item.name.name === 'data-tip-id';
    });
    if (attrItem && attrItem.length > 0) {
      return;
    } else {
      buildTagAttributes.push(buildAttribute(t, id));
    }
  } else {
    buildTagAttributes = [buildAttribute(t, id)];
  }

  return t.jSXOpeningElement(
    path.node.name, // object: JSXMemberExpression | JSXIdentifier
    buildTagAttributes,
    path.node.selfClosing // 是否自闭合，不设的话默认为false，需要根据标签原有特性去设置
  );
}

// 匹配国际化：di18n
function isDi18n(calleeNode) {
  if (
    calleeNode.type === 'MemberExpression' &&
    calleeNode.object &&
    calleeNode.object.type === 'Identifier' &&
    calleeNode.object.name === 'intl' &&
    calleeNode.property &&
    calleeNode.property.type === 'Identifier' &&
    calleeNode.property.name === 't'
  ) {
    return true;
  }
  return false;
}

module.exports = function() {
  return {
    JSXElement: (path) => {
      const attributes = path.node.openingElement.attributes;
      if (attributes) {
        // 绑了特殊属性的节点，其子节点需要忽略
        const ignoreAttr = _.find(attributes, item => item.name && item.name.name === 'tips-bp-ignore');
        if (ignoreAttr) {
          path.skip();
        }
      }
    },
    JSXOpeningElement: (path) => {
      const children = path.parent.children;
      let shouldBuryPoint = false;
      // 匹配子元素【非JSX元素、非条件表达式、非逻辑表达式、非函数调用】外其它的
      if (children && children.length > 0) {
        let onlyJSXText;
        _.forEach(children, item => {
          if (item.type === 'JSXText') {
            let textValue = item.value.replace(/\r\n|\s|\n/g, ''); // 去除空格和空行
            if (textValue !== '') {
              shouldBuryPoint = true;
            }
          } else {
            onlyJSXText = false;
          }
        });
        if (onlyJSXText) { // 只有JSXText节点
          shouldBuryPoint = true;
        }
        if (!shouldBuryPoint) {
          _.forEach(children, item => {
            if (item.type === 'JSXExpressionContainer') {
              if (
                item.expression.type === 'Identifier' ||
                item.expression.type === 'MemberExpression' ||
                item.expression.type === 'BinaryExpression'
              ) {
                shouldBuryPoint = true;
              } else if (item.expression.type === 'CallExpression') {
                const calleeNode = item.expression.callee;
                shouldBuryPoint = isDi18n(calleeNode);
              }
            }
          });
        }
      } else if (
        children &&
        children.length === 0
      ) { // 空节点
        shouldBuryPoint = true;
      }

      if (shouldBuryPoint) {
        const tipsUniqId = `${getSeconds()}-${_.uniqueId()}`;
        const newOpeningElement = buildTipsIdAttributeOpeningElement(path, t, tipsUniqId);
        if (newOpeningElement) {
          path.replaceWith(newOpeningElement);
          if (!path.node.attributes) {
            path.skip();
          }
        }
      }
    },
  }
}