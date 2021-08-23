const FormField = (props) => {
  const getFieldLabel = () => {
    if (!props.label) {
      return null;
    } else {
      let className = '';
      if (props.labelPosition === 'left') {
        className = 'form-field__label--left';
      }

      return (
        <label className={`form-field__label ${className}`} style={{fontWeight: "bold", fontSize: "12px"}}>
          {props.label}
        </label>
      );
    }
  }

  const getFormBody = () => {
    return (
      <div
        className={`form-field__body form-field__body--${props.labelPosition}`}>
        {getFieldLabel()}
        <div
          className={`form-field__content`}
        >{props.children}</div>
      </div>
    );
  }

  return <div className="form-field">{getFormBody()}</div>;
};

FormField.defaultProps = {
  labelPosition: 'top',
};

export default FormField;
