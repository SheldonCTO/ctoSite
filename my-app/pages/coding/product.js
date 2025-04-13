import Image from "next/image";
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

export default function ProductPage(){

	return(
		<>
		 <div className="wholeBody">
			<div className="productMain">
			<Image
            src="productMain.png"
            alt="productMain"
            weight={`300px`}
            height={`auto`}
          />
		  <ListGroup>
            <ListGroup.Item>
              Multi Relate Data handle
            </ListGroup.Item>
            <ListGroup.Item>Bootstrap and Authenticate Function Handling</ListGroup.Item>
			<ListGroup.Item>Authenticate token security function</ListGroup.Item>
			<ListGroup.Item>Shopping Cart</ListGroup.Item>
          </ListGroup>
			</div>
		 </div>
		 <Button href="https://assignment6-lemon.vercel.app">Self Website</Button>
		</>
	)
}