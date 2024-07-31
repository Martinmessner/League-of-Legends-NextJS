interface ErrorMessagesAlertProps {
  error: string;
}

export default function ErrorMessagesAlert({ error }: ErrorMessagesAlertProps) {
  return (
    <>
      {error && (
        <div className="center-eyes">
          <p className="errors">{error}</p>
          <div className="loader-eyes"></div>
        </div>
      )}
    </>
  );
}
