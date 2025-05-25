import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getByIdPost } from '../apis/postApi'

const DetailPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState('')
  useEffect(() => {
    const getPost = async () => {
      const data = await getByIdPost(postId)
      setPost(data)
    }
    getPost()
  }, [postId])
  console.log(post)
  return <div></div>
}

export default DetailPage
