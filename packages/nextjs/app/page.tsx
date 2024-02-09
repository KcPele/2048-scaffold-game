import type { NextPage } from "next";
import BoardView from "~~/components/game/Board";
import "~~/styles/main.scss";
import "~~/styles/submain.scss";

const Home: NextPage = () => {
  return <BoardView />;
};

export default Home;
