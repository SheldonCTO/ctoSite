export default function handler(req, res) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log(apiUrl)
  res.status(200).json({ message: "Hello from Vercel API!" });
}
