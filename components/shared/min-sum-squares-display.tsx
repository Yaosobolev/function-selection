interface Props {
  functionView: React.ReactNode;
}

export const MinSumSquaresDisplay: React.FC<Props> = ({ functionView }) => {
  return (
    <>
      <h2 className="text-xl mt-7 text-nowrap">Итоговая функция</h2>
      <p className="text-nowrap">
        {" "}
        Наиболее подходящие по внешнему виду приближающия функция:{" "}
        {functionView}
      </p>
    </>
  );
};
