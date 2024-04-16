const List = ({ activeIndex, daysOfWeek, items }) => {
  <div>
    {items
      .filter((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        return day === daysOfWeek[activeIndex];
      })
      .map((block, index) => (
        <p key={index}>{block.main.temp}</p>
      ))}
  </div>;
};
export default List;
