INSERT INTO users (
  username,
  password,
  profile_pic
) VALUES (
  ${username},
  ${hash},
  ${profile_pic}
)
returning user_id, username, profile_pic;