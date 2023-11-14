import { Link } from "react-router-dom";

interface PrimaryButtonProps {
  text: string;
  link?: string;
  onClickFunc?: any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  link,
  onClickFunc,
}) => {
  return (
    <div className=" flex justify-center items">
      {link ? (
        <Link to={link!}>
          <button
            className="primary-button"
            type="submit"
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          onClick={onClickFunc}
          className="primary-button"
          type="submit"
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default PrimaryButton;
