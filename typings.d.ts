export interface Post {
  _id: string;
  _createdAt: string;
  description: string;
  title: string;
  author: {
    name: string;
    image: string
  };
  mainImage: {
    asset: {
      url: string
    }
  };
  slug: {
    current: string;
  };
  body: object[];
  comments: Comment[]
}

export interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Comment {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string
  };
}