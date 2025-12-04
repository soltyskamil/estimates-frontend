import "./dashboard-welcome.scss";

const DashboardWelcome = () => {
  return (
    <div className="dashboard-welcome">
      <header className="dashboard-welcome__header">
        <h2 className="dashboard-welcome__title">Witaj!</h2>
        <p className="dashboard-welcome__subtitle">
          Rozpocznij swoją przygodę w aplikacji. Wybierz sposród opcji na
          nawigatorze
        </p>
      </header>
    </div>
  );
};

export default DashboardWelcome;
