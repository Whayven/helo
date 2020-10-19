SELECT p.post_id, p.title, u.profile_pic AS author_pic, u.username AS author 
FROM post p
JOIN users u ON p.author_id = u.user_id
WHERE p.title LIKE Concat('%',${search},'%');