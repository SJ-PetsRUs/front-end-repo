import React from 'react';
import { Button, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import './contentcards.css';

import {
	BsFillArrowUpSquareFill,
	BsFillArrowDownSquareFill,
} from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ContentCards({ title, body, createdAt, id, votes, getPosts }) {
	const navigate = useNavigate();

	const [currentVote, setCurrentVote] = useState(0);
	const [currentPost, setCurrentPost] = useState({
		title: title,
		body: body,
		votes: votes,
	});

	let incrementVote = () => {
		setCurrentVote(currentVote + 1);
		setCurrentPost({ ...currentPost, votes: currentVote });
	};
	let decrementVote = () => {
		setCurrentVote(currentVote - 1);
		setCurrentPost({ ...currentPost, votes: currentVote });
	};
	console.log(currentVote);
	const handleChange = async (event) => {
		try {
			const response = await axios.put(
				`https://redoit-api.herokuapp.com/api/posts/${String(id)}`,
				currentPost
			);
			console.log(response);

			if (response.status === 200) {
				getPosts();
				navigate('/');
				console.log(response);
			}
		} catch (error) {
			console.log(error);
			console.log(currentPost);
		}
	};
	useEffect(() => {
		handleChange();
	}, [currentVote]);
	// function handleChange(event) {
	// 	setVote({ ...vote, [event.target.id]: event.target.value });
	// }
	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	try {
	// 		const response = await axios.post(
	// 			'http://localhost:8000/api/posts',
	// 			vote
	// 		);
	// 		console.log(response);
	// 		if (response.status === 201) {
	// 			navigate('/');
	// 			console.log(response);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	const handleDelete = async () => {
		try {
			const response = await axios.delete(
				`https://redoit-api.herokuapp.com/api/posts/${String(id)}`
			);
			if (response.status === 204) {
				getPosts();
				navigate('/');
			}
		} catch (error) {}
	};

	const handleCommentsClick = async () => {
		navigate(`/comments/${String(id)}`);
	}

	const handleEdit = async () => {
		//GET the post with the given id
		// try {
		// 	const getResp = await axios.get(
		// 		`https://redoit-api.herokuapp.com/api/posts/${id}`
		// 	);
		// 	const getRespData = await getResp.json();
		// 	console.log(getRespData);
		// } catch (error) {}
		//allow user to edit in the newpost component
		//PUT the edited post to the db
		// let currentPostId = { id };
		// sessionStorage.setItem('currentPostId', currentPostId);
		navigate(`/editpost/${String(id)}`);
	};

	return (
		<div className='cards'>
			<Card className='form'>
				<Card.Header className='header'>
					<div className='d-flex flex-row'>
						<button onClick={incrementVote}>
							<BsFillArrowUpSquareFill className='arrow' />
						</button>
						<span className='m-3'>{votes}</span>
						<button onClick={decrementVote}>
							<BsFillArrowDownSquareFill className='arrow m-2' />
						</button>
					</div>
					Posted by: {createdAt}
					Id: {id}
					<DropdownButton
						className='drop-down'
						id='dropdown-basic-button'
						title=''>
						<Dropdown.Item onClick={handleDelete} href='#/action-1'>
							Delete post
						</Dropdown.Item>
						<Dropdown.Item onClick={handleEdit} value={id} href='#/action-2'>
							Edit Post
						</Dropdown.Item>
					</DropdownButton>
				</Card.Header>
				<Card.Body className='cardBody'>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{body}</Card.Text>
					<button className='btn d-flex justify-content-start' onClick={handleCommentsClick}>comments</button>
				</Card.Body>
			</Card>
		</div>
	);
}

export default ContentCards;
