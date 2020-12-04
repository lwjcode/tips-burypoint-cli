import React, { Component } from 'react';
interface Props {
  name: String;
}

class App extends Component {
  ff(params: string) {
    console.log(params);
  }

  render() {
    const a = {} as Props;
    const columns = [
      {
        title: <span data-tip-id="1590548444-1">标题</span>,
      },
    ];
    return (
      <div>
        <div data-tip-id="1590548444-3">
          天灵灵，地灵灵
          <div data-tip-id="1590548444-5">天灵灵，地灵灵</div>
          <div data-tip-id="1590548444-7">天灵灵，地灵灵</div>
          天灵灵，地灵灵
          <div id="lolo" data-tip-id="1590548444-9">
            lingling
          </div>
          <Tag
            title={<span data-tip-id="1590548444-13">woshishuxing</span>}
            data-tip-id="1590548444-11"
          >
            wer
          </Tag>
          <div>
            {list.map((item) => {
              return (
                <span key={item} data-tip-id="1589965817-15">
                  {item}
                </span>
              );
            })}
          </div>
          <div data-tip-id="1589965817-17"></div>
          <div>
            {perm ? (
              <div data-tip-id="1589965817-19">{text}</div>
            ) : (
              <div data-tip-id="1589965817-21" />
            )}
          </div>
          <Student name="哈哈" age={12} data-tip-id="1589965817-23" />
        </div>
        <span data-tip-id="1589965817-25">{system.name}</span>
        <span data-tip-id="1589965817-27">{system / name}</span>
        <span>{aa ? 'aa' : 'bb'}</span>
        <span tips-bp-ignore>
          {func()}
          {a ? <span>我是真</span> : <span>我是假</span>}
        </span>
        <div>
          <span data-tip-id="1590548329-15">{intl.t('提交')}</span>
          <span data-tip-id="1590548329-17">wdce</span>
        </div>
        <Menu.Item data-tip-id="1606896957-17">123</Menu.Item>
      </div>
    );
  }
}

export default App;
