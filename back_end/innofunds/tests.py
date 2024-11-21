from django.test import TestCase

from innofunds.models import FintechFriend, FintechGroup, FintechUser


class FintechGroupTestCases(TestCase):
    def setUp(self) -> None:
        FintechUser.objects.create(
            password="abc",
            email="example1@email.com",
            first_name="Example",
            last_name="Example",
        )
        FintechUser.objects.create(
            password="abc",
            email="example2@email.com",
            first_name="Example",
            last_name="Example",
        )
        FintechUser.objects.create(
            password="abc",
            email="example3@email.com",
            first_name="Example",
            last_name="Example",
        )

        FintechGroup.objects.create(
            name="group1", description="Group 1", private=False)
        FintechGroup.objects.create(
            name="group2", description="Group 2", private=False)
        FintechGroup.objects.create(
            name="group3", description="Group 2", private=True)


class FriendshipTestCases(TestCase):
    def setUp(self):
        FintechUser.objects.create(
            password="abc",
            email="example1@email.com",
            first_name="Example",
            last_name="Example",
        )
        FintechUser.objects.create(
            password="abc",
            email="example2@email.com",
            first_name="Example",
            last_name="Example",
        )
        FintechUser.objects.create(
            password="abc",
            email="example3@email.com",
            first_name="Example",
            last_name="Example",
        )

        # DO NOT USE: WILL BE DELETED
        FintechUser.objects.create(
            password="abc",
            email="example4@email.com",
            first_name="Example",
            last_name="Example",
        )

    def test_friendship_create_delete(self):
        # user IDs begin at 1
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        FintechFriend.objects.create_friendship(user1.id, user2.id)

        # should be friends with user 2
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)

        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 1)
        self.assertEqual(user2_friends[0], 1)

        user3 = FintechUser.objects.get(email="example3@email.com")
        FintechFriend.objects.create_friendship(user1.id, user3.id)
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 2)
        self.assertEqual(user1_friends, [2, 3])

        FintechFriend.objects.remove_relationship(user1.id, user2.id)
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends, [3])

        self.assertEqual(len(user2_friends), 0)

    def test_friendships_invariant(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        user3 = FintechUser.objects.get(email="example3@email.com")

        FintechFriend.objects.create_friendship(user1.id, user2.id)
        FintechFriend.objects.create_friendship(user2.id, user3.id)

        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(user1.id, user2.id)
        )
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(user1.id, user3.id)
        )

        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 2)
        self.assertIn(1, user2_friends)
        self.assertIn(3, user2_friends)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(user1.id, user2.id)
        )
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(user2.id, user3.id)
        )

        user3_friends = FintechFriend.objects.get_user_relationships(user3.id)
        self.assertEqual(len(user3_friends), 1)
        self.assertEqual(user1_friends[0], 2)
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(user1.id, user3.id)
        )
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(user2.id, user3.id)
        )

        FintechFriend.objects.remove_relationship(user2.id, user3.id)

        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 1)
        self.assertIn(1, user2_friends)

        user3_friends = FintechFriend.objects.get_user_relationships(user3.id)
        self.assertEqual(len(user3_friends), 0)

    def test_no_friendship(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 0)

        FintechFriend.objects.remove_relationship(user1.id, user2.id)
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 0)
        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 0)

    def test_user_friendship_delete(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        FintechFriend.objects.create_friendship(user1.id, user2.id)

        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)

        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 1)
        self.assertEqual(user2_friends[0], 1)

        FintechFriend.objects.remove_user_friendships(user1.id)
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 0)
        user2_friends = FintechFriend.objects.get_user_relationships(user2.id)
        self.assertEqual(len(user2_friends), 0)

    def test_user_deleted(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user4 = FintechUser.objects.get(email="example4@email.com")
        FintechFriend.objects.create_friendship(user1.id, user4.id)

        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(user1.id, user4.id)
        )

        user4.delete()
        user1_friends = FintechFriend.objects.get_user_relationships(user1.id)
        self.assertEqual(len(user1_friends), 0)

    def test_update_friendship(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        self.assertFalse(
            FintechFriend.objects.have_relationship(user1.id, user2.id))
        self.assertFalse(
            FintechFriend.objects.have_relationship(user2.id, user1.id))
        FintechFriend.objects.create_friendship(user1.id, user2.id)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 0)
        )
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 0)
        )
        self.assertTrue(
            FintechFriend.objects.have_relationship(user1.id, user2.id))
        self.assertTrue(
            FintechFriend.objects.have_relationship(user2.id, user1.id))

        FintechFriend.objects.update_friendship(user1.id, user2.id, 2)
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 2)
        )
        self.assertFalse(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 2)
        )
        self.assertTrue(
            FintechFriend.objects.have_relationship(user1.id, user2.id))
        self.assertTrue(
            FintechFriend.objects.have_relationship(user2.id, user1.id))

    def test_friendship_exceptions(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        FintechFriend.objects.create_friendship(user1.id, user2.id)
        self.assertRaises(
            Exception, FintechFriend.objects.create_friendship, user1.id, user2.id
        )
        self.assertRaises(
            Exception, FintechFriend.objects.create_friendship, user1.id, user2.id
        )

        FintechFriend.objects.remove_relationship(user1.id, user2.id)
        self.assertRaises(
            Exception, FintechFriend.objects.get_friendship, user1.id, user2.id
        )
        self.assertRaises(
            Exception, FintechFriend.objects.get_friendship, user2.id, user1.id
        )
        self.assertRaises(
            Exception, FintechFriend.objects.update_friendship, user1.id, user2.id, 0
        )
        self.assertRaises(
            Exception, FintechFriend.objects.update_friendship, user2.id, user1.id, 0
        )

    def test_self_friend(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        self.assertRaises(
            Exception, FintechFriend.objects.create_friendship, user1.id, user1.id
        )

    def test_limit(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        user3 = FintechUser.objects.get(email="example3@email.com")

        FintechFriend.objects.create_friendship(user1.id, user2.id)
        FintechFriend.objects.create_friendship(user1.id, user3.id)

        user1_friends_0 = FintechFriend.objects.get_user_relationships(
            user1.id, type=3, limit=1, offset=0
        )
        self.assertEqual(len(user1_friends_0), 1)

        user1_friends_1 = FintechFriend.objects.get_user_relationships(
            user1.id, type=3, limit=1, offset=1
        )
        self.assertEqual(len(user1_friends_1), 1)
        self.assertNotEqual(user1_friends_0, user1_friends_1)

    def test_get_relationship_type(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        user3 = FintechUser.objects.get(email="example3@email.com")

        FintechFriend.objects.create_friendship(user1.id, user2.id)
        FintechFriend.objects.create_friendship(user1.id, user3.id)
        user1_relationships = FintechFriend.objects.get_user_relationships(
            user1.id)
        self.assertIn(2, user1_relationships)
        self.assertIn(3, user1_relationships)

        FintechFriend.objects.update_friendship(user1.id, user2.id, 1)
        FintechFriend.objects.update_friendship(user1.id, user3.id, 2)
        user1_relationships = FintechFriend.objects.get_user_relationships(
            user1.id, 1)
        self.assertIn(2, user1_relationships)
        self.assertNotIn(3, user1_relationships)

        user1_relationships = FintechFriend.objects.get_user_relationships(
            user1.id, 2)
        self.assertIn(3, user1_relationships)
        self.assertNotIn(2, user1_relationships)

    def test_invariant(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        self.assertRaises(
            Exception, FintechFriend.objects.create_friendship, user2.id, user2.id
        )
        self.assertRaises(
            Exception, FintechFriend.objects.update_friendship, user2.id, user2.id, 2
        )
        self.assertRaises(
            Exception,
            FintechFriend.objects.have_friendship_of_type,
            user2.id,
            user2.id,
            2,
        )

    def test_friend_requests(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        FintechFriend.objects.friend_request(user1.id, user2.id)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 1)
        )
        FintechFriend.objects.friend_request(user2.id, user1.id, False)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 1)
        )
        FintechFriend.objects.friend_request(user2.id, user1.id)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )

        FintechFriend.objects.remove_relationship(user1.id, user2.id)
        FintechFriend.objects.friend_request(user2.id, user1.id)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 2)
        )
        FintechFriend.objects.friend_request(user1.id, user2.id)
        self.assertTrue(
            FintechFriend.objects.have_friendship_of_type(
                user1.id, user2.id, 3)
        )
