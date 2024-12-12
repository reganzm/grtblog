import React from 'react';
import {Container} from '@radix-ui/themes';
import {getFriendList} from "@/api/friends";
import FriendCollapsibleInfo from "@/components/friend/FriendCollapsibleInfo";
import FriendPageMotion from "@/components/friend/FriendPageMotion";

const FriendPage = async () => {
    const friends = await getFriendList({next: {revalidate: 60}});
    return (
        <Container size="3">
            <div className="p-10">
                <FriendPageMotion friends={friends}/>
                <FriendCollapsibleInfo/>
            </div>
        </Container>
    );
};

export default FriendPage;
