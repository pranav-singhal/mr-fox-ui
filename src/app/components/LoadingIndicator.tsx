import classnames from "classnames";

interface LoadingIndicatorProps {
  whiteColor?: boolean;
}

const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const isWhiteColor = props.whiteColor || false;
  return (
    <div
      className={classnames(
        "animate-spin h-5 w-5 border-l-2 border-y-2 rounded-full",
        { "border-blue-500": !isWhiteColor }
      )}
    />
  );
};

export default LoadingIndicator;
