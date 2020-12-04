import React, { Component } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Select } from 'antd';
import _ from 'lodash';
const FormItem = Form.Item;
interface IProps {
  groupId: string;
  visible: boolean;
  onOk: () => void;
  onCancel?: () => void;
  destroy: () => void;
}
interface IState {
  submitLoading: boolean;
}

class Test extends Component<IProps & FormComponentProps, IState> {
  constructor(props: IProps & FormComponentProps) {
    super(props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form
          layout="vertical"
        >
          <FormItem label="test：">
            {getFieldDecorator('test', {
              rules: [
                {
                  required: true,
                  message: 'test...',
                },
              ],
            })(<Select mode="tags" data-tip-id="1606898939-18" />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}