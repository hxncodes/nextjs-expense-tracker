rules_version = '2';

service cloud.firestore {
match /databases/{database}/documents {
match /income/{incomeId} {
allow read, delete: if request.auth != null && request.auth.uid == resource.data.uid;
allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
}
match /expenses/{expenseId} {
allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
}
}
}
