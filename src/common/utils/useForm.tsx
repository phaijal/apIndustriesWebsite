import { useState, useEffect } from "react";
import { notification } from "antd";
import emailjs from '@emailjs/browser';

export const useForm = (validate: any) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent! We will be reverting shortly.",
    });
  };

  const sendEmail = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm('service_xi1yx3f', 'template_edkxmyq', e.target, 'user_x6t9me5bTCCHttLxzzqjs')
      .then((result) => {
        setShouldSubmit(true);
        e.target.reset()
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    if (Object.keys(values).length === 3) {
      sendEmail(event)
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
