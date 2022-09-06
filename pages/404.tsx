import {Button, Result} from "antd";
import {useRouter} from "next/router";
import {useCallback} from "react";

export default function Custom404() {
  const { push } = useRouter()
  const backToHome = useCallback(() => push('/'),[])
  return (
    <div style={{ height: '100vh', display: "grid", alignContent: "center"}}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={backToHome} type="primary">Back Home</Button>}
      />
    </div>
  )
}