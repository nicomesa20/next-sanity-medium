const GET_POSTS = `*[_type=='post']{
  _id,
  title,
  author -> {
  name,
  image
 }
  ,
  description,
  mainImage,
  slug
}`

const GET_POST_FOR_STATIC_PATHS = `*[type== "post"]{
    _id,
    slug {
      current
    }
  }`

const GET_SPECIFIC_POST = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    body,
    content,
    'comments': 
    *[_type=='comment' && post._ref == ^._id && approved == true]
}`

export default { GET_POSTS, GET_POST_FOR_STATIC_PATHS, GET_SPECIFIC_POST }