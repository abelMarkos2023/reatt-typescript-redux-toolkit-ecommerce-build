import { Col, Row } from "react-bootstrap"
import ContentLoader from "react-content-loader"

const CategorySkeleton = () => {
    const renderSkeletons = Array(5).fill(0).map((_,idx) => (
        <Col key={idx} xs={3} className="d-flex justify-content-between mb-5 mt-2 ">

  <ContentLoader 
    speed={2}
    width={134}
    height={209}
    viewBox="0 0 134 209"
    backgroundColor="#d2d0d0"
    foregroundColor="#b6b4b4"
   
  >
    <rect x="-2" y="148" rx="3" ry="3" width="410" height="6" /> 
    <circle cx="68" cy="69" r="66" />
  </ContentLoader>


        </Col>
    ))

    return (
       <Row>
        {renderSkeletons}
       </Row>
      )
      
}
export default CategorySkeleton