export interface MessageItem {
    id: string;
    name: string;
    subject: string;
    text: string;
    read: boolean;
    date: Date;
    status: string;
    labels: string[];
}

export const messages = [
    {
        id: "id_1",
        name: "Message 1",
        subject: "Message 1",
        text: "Some text...",
        read: true,
        date: new Date(),
        status: "queue",
        labels: [ "queued" ]
    },
    {
        id: "id_2",
        name: "Message 2",
        subject: "Message 2",
        text: "Some text...",
        read: false,
        date: new Date(),
        status: "queue",
        labels: [ "queued" ]
    },
    {
        id: "id_3",
        name: "Message 3",
        subject: "Message 3",
        text: "Some text...",
        read: false,
        date: new Date(),
        status: "dead-letter",
        labels: [ "dead-letter" ]
    }
]
