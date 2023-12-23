import React from "react";

class Robots extends React.Component {
  static async getInitialProps({ res }: any) {
    res.setHeader("Content-Type", "text/plain");
    res.write(`User-agent: *\nDisallow:\n`);
    res.end();
  }
}

export default Robots;
