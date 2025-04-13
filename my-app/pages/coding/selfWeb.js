import Image from "next/image";
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
//import { useRouter } from "next/router";

export default function SelfPage() {
  // const router = useRouter();
  // const { option } = router.query;

  return (
    <>
      <div className="wholeBody">
        <div className="dynamicImage>">
          <Image
            src="dynamicImg.png"
            alt="dynamic"
            weight={`300px`}
            height={`auto`}
          />
          <ListGroup>
            <ListGroup.Item>
              Using Ai to convert the static image to dynamic image
            </ListGroup.Item>
            <ListGroup.Item>
              Setting up File upload server without hosting
            </ListGroup.Item>
            <ListGroup.Item>
              Convert the jpg to base64 for save to Back End
            </ListGroup.Item>
            <ListGroup.Item>
              Display the base64 image from API String
            </ListGroup.Item>
            <ListGroup.Item>AUTO Email message setup</ListGroup.Item>
            {/* <ListGroup.Item>Convert the MP4 to display format</ListGroup.Item> */}
          </ListGroup>
        </div>

        
        
       
	
		
      </div>
	  <Button href="./">Self Website</Button>
    </>
  );
}
