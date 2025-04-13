import Link from 'next/link';
import Message from '../components/messageBox';
export default function Contact()

{
	return (
	<>
		<div style={{
          position: "fixed",
          marginTop: "75px",
		  marginLeft: "30px"}}>
			<br />
			<h1 >Contact Me</h1>
			
			<Message></Message>
		</div>
		</>
	)
}