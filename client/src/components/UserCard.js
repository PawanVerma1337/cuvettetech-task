import Card from 'react-bootstrap/Card';

function UserCard({user}) {
    return (
        <Card className="h-100 px-2 py-4">
            <h1>{user.name}</h1>
            <h3>{user.skills}</h3>
            <h3>{user.month}</h3>
        </Card>
    )
}

export default UserCard;