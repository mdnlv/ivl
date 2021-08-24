import React, { useState } from 'react';
import {Col, Row, Radio, Input, Checkbox, Button, Modal, Typography, Space } from 'antd/lib';
import FormField from './FormField';
import Politic from './Politic';
import InputTag from './InputTag';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './styles.css';

const Fields = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { Title } = Typography;
  const formik = props.formik;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const suffix = (
    <ExclamationCircleOutlined 
      style={{
        fontSize: 16,
        color: '#ff2e56',
        position: 'absolute',
        right: 35,
        top: 33
      }}
    />);

  return (
    <div className={'form-section'}>
      <Space size={18} direction="vertical" >
        <Title level={2}>Анкета соискателя</Title>
        <Row>
          <Row>
            <Title level={4} style={{fontWeight: "500"}}>Личные данные</Title>
          </Row>
          <Row gutter={[48, 36]} className="fields">
            <Col xs={24} xl={12}>
              <FormField label={'Имя *'} name={'firstName'}>
                <Input 
                  placeholder="Имя" 
                  size="large"
                  {...formik.getFieldProps('firstName')} 
                  style={formik.touched.firstName && formik.errors.firstName && {borderColor: "#ff2e56", color: "#ff2e56", boxShadow: "0 0 0 2px #ff2e5611"}}
                />
                {formik.touched.firstName && formik.errors.firstName && suffix}
                {formik.touched.firstName && formik.errors.firstName && <div className="alert">{formik.errors.firstName}</div>}
              </FormField>
            </Col>

            <Col xs={24} xl={12}>
              <FormField label={'Фамилия *'} name={'lastName'}>
                <Input 
                  placeholder="Фамилия" 
                  size="large"
                  {...formik.getFieldProps('lastName')} 
                  style={formik.touched.lastName && formik.errors.lastName && {borderColor: "#ff2e56", color: "#ff2e56", boxShadow: "0 0 0 2px #ff2e5611"} }
                />
                {formik.touched.lastName && formik.errors.lastName && suffix}
                {formik.touched.lastName && formik.errors.lastName && <div className="alert">{formik.errors.lastName}</div>}
              </FormField>
            </Col>

            <Col xs={24} xl={12}>
              <FormField label={'Электронная почта *'} name={'email'}>
                <Input 
                  placeholder="Электронная почта" 
                  size="large"
                  {...formik.getFieldProps('email')}  
                  style={formik.touched.email && formik.errors.email && {borderColor: "#ff2e56", color: "#ff2e56", boxShadow: "0 0 0 2px #ff2e5611"} }
                />
                {formik.touched.email && formik.errors.email && suffix}
                {formik.touched.email && formik.errors.email && <div className="alert">{formik.errors.email}</div>}
              </FormField>
            </Col>

            <Col xs={24} xl={12}>
              <FormField label={'Telegram *'} name={'telegram'}>
                <Input 
                  placeholder="Telegram" 
                  size="large"
                  {...formik.getFieldProps('telegram')} 
                  style={formik.touched.telegram && formik.errors.telegram && {borderColor: "#ff2e56", color: "#ff2e56", boxShadow: "0 0 0 2px #ff2e5611"} }
                />
                {formik.touched.telegram && formik.errors.telegram &&suffix}
                {formik.touched.telegram && formik.errors.telegram && <div className="alert">{formik.errors.telegram}</div>}
              </FormField>
            </Col>

            <Col xs={24} xl={12}>
              <FormField label={'Укажите ваши навыки'} name={'skils'}>
                <InputTag isSubmit={props.isSubmit} />
              </FormField>
            </Col>
          </Row>
        </Row>

        <Title level={4} style={{fontWeight: "500", marginTop: 20}}>Пол *        
          {formik.touched.gender && formik.errors.gender ? (
            <span className="alert" style={{marginLeft: 8}}>{formik.errors.gender}</span>
          ) : null}   
        </Title>

        <Space size={36} direction="vertical" wrap>
          <Row style={{marginTop: -25}}>
            <FormField name={'gender'}>
              <Radio.Group   
                {...formik.getFieldProps('gender')} 
              >
                <Radio 
                  name="gender"
                  value="male"
                  checked={formik.values.gender === 'male'}
                  onChange={formik.handleChange}
                >Мужской</Radio>
                <Radio 
                  name="gender"
                  value="female"
                  checked={formik.values.gender === 'female'}
                  onChange={formik.handleChange}
                >Женский</Radio>
              </Radio.Group>
            </FormField>
          </Row>

          <Row>
            <FormField name={'police'}>
              <Checkbox 
                name={'police'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}   
                value={formik.values.police}
                checked={formik.values.police} 
                onClick={()=>{formik.setFieldValue('police',!formik.values.police)}}
              >* Я согласен с
              </Checkbox>
              <a onClick={showModal} style={{marginLeft: -2, color: "#40a9ff"}}>политикой конфединциальности</a>
              {formik.touched.police && formik.errors.police ? (
                <div className="alert">{formik.errors.police}</div>
              ) : null}
            </FormField>
          </Row>  
        </Space> 
        
        <Row style={{marginTop: 10}}>
          <Col xs={24} className={'submit'}>
          <Button
            type={'primary'}
            shape="round"
            size="large"
            className={'save-btn'}
            onClick={()=>{
              formik.handleSubmit();
            }}
          >
            Отправить
          </Button> 
          </Col>
        </Row>  
      </Space>

      <Modal 
        visible={isModalVisible} 
        width={1000}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            shape="round"
            onClick={() => {
              
              formik.setFieldValue('police',true);
              setIsModalVisible(false);
            }}
            size="large"
            style={{marginBottom: "10px"}}
          >
            Согласен
          </Button>
        ]}
      >
        <Politic style={{overflowY: 'scroll', height: 'calc(100vh - 200px)'}}/>
      </Modal>

      <Modal 
        className="modal-submit"
        visible={props.isSubmit} 
        width={300}
        bodyStyle={{textAlign: "center"}}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            shape="round"
            onClick={() => {
              props.setIsSubmit(false);
            }}
            size="large"
            style={{marginBottom: "10px"}}
          >
            Понятно
          </Button>
        ]}
      >
        <Title level={3}>
          Спасибо!
        </Title>
        Мы скоро свяжемся с вами
      </Modal>
    </div>
  );
};

export default Fields;