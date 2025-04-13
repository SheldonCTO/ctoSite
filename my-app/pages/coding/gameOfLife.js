import Image from "next/image";
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

export default function ProductPage(){

	return(
		<>
		 <div className="wholeBody">
			<div className="gameOfLife">
			<Image
            src="gameOfLife.png"
            alt="gameOfLife"
            weight={`300px`}
            height={`auto`}
          />
		  <ListGroup>
            <ListGroup.Item>
              DOM Handling
            </ListGroup.Item>
            <ListGroup.Item>Mouse Press Handling</ListGroup.Item>
			<ListGroup.Item>game spot function setting</ListGroup.Item>
			<ListGroup.Item>CSS and html Handling</ListGroup.Item>
          </ListGroup>
			</div>
		 </div>
		 <Button href="https://game-of-life-psi-eight.vercel.app/">Game Of Life</Button>
		</>
	)
}