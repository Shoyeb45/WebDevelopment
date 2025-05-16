interface User1 {
    id: string,
    name: string
}

const userMap = new Map<string, User1> ();

userMap.set('abc123', { id: 'abc123', name: 'John Doe' });
userMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });

// Accessing a value using .get
console.log(userMap.get('abc123'));
console.log(userMap);
