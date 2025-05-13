import pytest
from app import db
from app.models import User, Charity, Story
from datetime import datetime


@pytest.fixture
def setup_data(app):
    with app.app_context():
        db.drop_all()
        db.create_all()

        user = User(username="storyuser", email="story@example.com", password="secret")
        db.session.add(user)
        db.session.commit()  # Ensure user is saved

        charity = Charity(
            full_name="Story Charity",
            contact="0711002200",
            email="contact@storycharity.org",
            password_hash="secret_hash",
            description="Charity for stories",
            website_url="https://storycharity.org",
            user_id=user.id
        )
        db.session.add(charity)
        db.session.commit()  # Ensure charity is saved and ID is assigned

        return {"user_id": user.id, "charity_id": charity.id}


def test_create_story(app, setup_data):
    with app.app_context():
        story = Story(
            title="A Changed Life",
            beneficiary_name="Alice",
            content="This is a touching story about Alice's transformation.",
            image="https://example.com/story.jpg",
            charity_id=setup_data["charity_id"]
        )
        db.session.add(story)
        db.session.commit()

        retrieved = Story.query.filter_by(title="A Changed Life").first()
        assert retrieved is not None
        assert retrieved.beneficiary_name == "Alice"
        assert retrieved.charity_id == setup_data["charity_id"]
        assert isinstance(retrieved.created_at, datetime)


def test_story_serialization(app, setup_data):
    with app.app_context():
        story = Story(
            title="Hope Renewed",
            beneficiary_name="Bob",
            content="Bob found hope thanks to your donations.",
            image=None,
            charity_id=setup_data["charity_id"]
        )
        db.session.add(story)
        db.session.commit()

        serialized = story.to_dict()
        assert serialized["id"] == story.id
        assert serialized["title"] == "Hope Renewed"
        assert serialized["beneficiary_name"] == "Bob"
        assert serialized["content"] == "Bob found hope thanks to your donations."
        assert serialized["image"] is None
        assert serialized["charity_id"] == setup_data["charity_id"]
        assert isinstance(serialized["created_at"], str)


def test_story_deletion(app, setup_data):
    with app.app_context():
        story = Story(
            title="To Be Deleted",
            beneficiary_name="Testy",
            content="This story is meant to be deleted.",
            image=None,
            charity_id=setup_data["charity_id"]
        )
        db.session.add(story)
        db.session.commit()

        story_id = story.id
        db.session.delete(story)
        db.session.commit()

        assert db.session.get(Story, story_id) is None
