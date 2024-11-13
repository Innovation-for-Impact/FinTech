from django.test import TestCase

from innofunds.models import FintechFriend, FintechUser


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
        FintechFriend.objects.create_friendship(user1, user2)

        # should be friends with user 2
        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)

        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 1)
        self.assertEqual(user2_friends[0], 1)

        user3 = FintechUser.objects.get(email="example3@email.com")
        FintechFriend.objects.create_friendship(user1, user3)
        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 2)
        self.assertEqual(user1_friends, [2, 3])

        FintechFriend.objects.remove_friendship(user1, user2)
        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends, [3])

        self.assertEqual(len(user2_friends), 0)

    def test_friendships_invariant(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        user3 = FintechUser.objects.get(email="example3@email.com")

        FintechFriend.objects.create_friendship(user1, user2)
        FintechFriend.objects.create_friendship(user2, user3)

        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)
        self.assertTrue(FintechFriend.objects.have_friendship(user1, user2))
        self.assertFalse(FintechFriend.objects.have_friendship(user1, user3))

        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 2)
        self.assertIn(1, user2_friends)
        self.assertIn(3, user2_friends)
        self.assertTrue(FintechFriend.objects.have_friendship(user2, user1))
        self.assertTrue(FintechFriend.objects.have_friendship(user3, user2))

        user3_friends = FintechFriend.objects.get_user_friendships(user3)
        self.assertEqual(len(user3_friends), 1)
        self.assertEqual(user1_friends[0], 2)
        self.assertFalse(FintechFriend.objects.have_friendship(user3, user1))
        self.assertTrue(FintechFriend.objects.have_friendship(user2, user3))

        FintechFriend.objects.remove_friendship(user3, user2)

        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 1)
        self.assertIn(1, user2_friends)

        user3_friends = FintechFriend.objects.get_user_friendships(user3)
        self.assertEqual(len(user3_friends), 0)

    def test_no_friendship(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")

        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 0)

        FintechFriend.objects.remove_friendship(user1, user2)
        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 0)
        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 0)

    def test_user_friendship_delete(self):
        user1 = FintechUser.objects.get(email="example1@email.com")
        user2 = FintechUser.objects.get(email="example2@email.com")
        FintechFriend.objects.create_friendship(user2, user1)

        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 1)
        self.assertEqual(user1_friends[0], 2)

        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 1)
        self.assertEqual(user2_friends[0], 1)

        FintechFriend.objects.remove_user_friendships(user1)
        user1_friends = FintechFriend.objects.get_user_friendships(user1)
        self.assertEqual(len(user1_friends), 0)
        user2_friends = FintechFriend.objects.get_user_friendships(user2)
        self.assertEqual(len(user2_friends), 0)
