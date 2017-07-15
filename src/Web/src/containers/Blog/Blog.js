// libs
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "reactstrap";

// components
import userManager from "../../utils/userManager";
import * as postActions from "../../redux/modules/posts";
import BlogHeader from "../../components/BlogHeader.js";
import PostList from "../../components/PostList";

class Blog extends Component {
  componentDidMount() {
    this.props.getPosts(
      this.props.match.params.blogId,
      this.props.postStore.page
    );
  }

  handleOlderClick() {
    this.props.getPosts(
      this.props.userStore.profile.blog_id,
      this.props.postStore.page + 1
    );
  }

  handleNewerClick() {
    var page = this.props.postStore.page;
    this.props.getPosts(
      this.props.userStore.profile.blog_id,
      page > 1 ? page - 1 : 1
    );
  }

  render() {
    const { postStore: { loading, byIds, posts } } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <BlogHeader />
        <PostList ids={byIds} posts={posts} />
        <nav className="blog-pagination">
          <a onClick={() => this.handleOlderClick()} href="#">
            Older
          </a>
          <a
            onClick={() => this.handleNewerClick()}
            className="btn btn-outline-secondary"
            href="#"
          >
            Newer
          </a>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userStore: state.oidc.user,
    postStore: state.postStore
  };
}

export const mapDispatchToProps = dispatch =>
  bindActionCreators(postActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Blog);