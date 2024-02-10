export default function Page({ params }: { params: { test_id: string } }) {
    return <div>My Post: {params.test_id}</div>
  }
