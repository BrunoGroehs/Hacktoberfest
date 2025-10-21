import { Link } from "react-router-dom";

const CardLinkItem = ({ to, title, footer }) => {
  return (
    <Link to={to} className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-footer">{footer}</div>
    </Link>
  );
};

const CardLink = ({ items }) => {
  return (
    <div className="pages-links">
      {items &&
        items.map(({ to, title, footer }, idx) => (
          <CardLinkItem key={idx} to={to} title={title} footer={footer} />
        ))}
    </div>
  );
};

export default CardLink;
