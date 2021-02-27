import React from 'react';

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <div onClick={onClose} className="close-icon">&#x2715;</div>
      {message}
    </div>
  );
};
