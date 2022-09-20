import React from "react";
import HTMLFlipBook from "react-pageflip";
import "./MainPage.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover textured" ref={ref} data-density="hard">
      <div className="page-content">
        <h2 className="gold textured" data-text={props.children}></h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

class DemoBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
      screeHt: 1,
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  componentDidMount() {
    /*     this.setState({
      totalPage: this.flipBook.pageFlip().getPageCount(),
    }); */
    this.setState({
      screeHt: window.innerHeight,
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="book-container">
          <HTMLFlipBook
            width={550}
            height={733}
            minWidth={315}
            maxWidth={400}
            minHeight={400}
            maxHeight={600}
            size="stretch"
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={false}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="demo-book"
            ref={(el) => (this.flipBook = el)}
          >
            <PageCover>AGENDA</PageCover>
            <Page number={1}>Page content 1</Page>
            <Page number={2}>Page content 2</Page>
            <Page number={3}>Page content 3</Page>
            <Page number={4}>Page content 4</Page>
            <Page number={5}>Page content 5</Page>
            <Page number={6}>Page content 6</Page>
            <PageCover>END</PageCover>
          </HTMLFlipBook>
        </div>
      </div>
    );
  }
}

function MainPage() {
  return <DemoBook />;
}

export default MainPage;
