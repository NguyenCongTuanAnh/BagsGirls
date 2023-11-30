import React, { Fragment } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './blog.scss';

const BlogPage = () => {
  // Danh sách bài viết mẫu
  const blogPosts = [
    {
      id: 1,
      title: '10 Mẫu Balo Thời Trang Hot Nhất Năm Này',
      content: 'Nội dung của bài viết về các mẫu balo thời trang nổi bật trong năm.',
      image: 'https://i.imgur.com/SUPqSzR.jpg',
    },
    {
      id: 2,
      title: 'Cách Chọn Balo Phù Hợp Với Phong Cách Cá Nhân',
      content: 'Một số gợi ý và lời khuyên để chọn balo phù hợp với phong cách của bạn.',
      image: 'https://i.imgur.com/I2MddTG.jpg',
    },
    {
      id: 3,
      title: 'Cách Chọn Balo Phù Hợp Với Phong Cách Cá Nhân',
      content: 'Một số gợi ý và lời khuyên để chọn balo phù hợp với phong cách của bạn.',
      image: 'https://i.imgur.com/hqYOxox.jpg',
    },
  ];

  return (
    <Fragment>
      {/* <div className="fullpage">
        <div className="header001">
          <Header />
        </div>
        <div className="page_content">
          <div className="blog-container">
            <div className="blog-posts">
              {blogPosts.map((post) => (
                <div key={post.id} className="blog-post">
                  <img src={post.image} alt={post.title} className="blog-image" />
                  <div className="blog-content">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer_client">
          <Footer />
        </div>
      </div> */}

      <div className="header001">
        <Header />
      </div>
      <div className="blog-container">
        <div className="blog-posts">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer_client">
        <Footer />
      </div>
    </Fragment>
  );
};

export default BlogPage;
