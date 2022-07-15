import { LoadingOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { RootState } from "src/redux"

export const Admin = () => {
  return <div>This is admin route: allow you to view add/modify students and mentor</div>
}
export const Student = () => {
  return <div>This is Student route: allow you to view your mentor details & register new mentor</div>
}
export const Mentor = () => {
  return <div>This is admin route: allow you to view your students details & your register students</div>
}

export const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  const role = user?.role || -1
  switch (role) {
    case 1:
      return <Admin />
    case 2:
      return <Student />
    case 3:
      return <Mentor />
    default:
      return <LoadingOutlined />
  }
}
