import useSummonerStore from "../store/Store";

function ErrorMessagesAlert() {
  const { error } = useSummonerStore();
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

export default ErrorMessagesAlert;
