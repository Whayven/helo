SELECT p.post_id, p.title, p.img, p.content, p.author_id, u.username AS author, u.profile_pic AS author_pic 
FROM post p
JOIN users u ON p.author_id = u.user_id
WHERE p.post_id = ${id};