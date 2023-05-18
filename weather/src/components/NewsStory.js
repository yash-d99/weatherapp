import React, { useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
function NewsStory(props) {
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imgLink, setImgLink] = useState('');
    const [storyLink, setStoryLink] = useState('');
    const API_KEY = process.env.REACT_APP_API_KEY_NEWS;
    const setValues = (data) => {
        setTitle(data.results[props.articleNum].title);
        setAuthor(data.results[props.articleNum].byline);
        setDescription(data.results[props.articleNum].abstract);
        setImgLink(data.results[props.articleNum].multimedia[1].url);
        setStoryLink(data.results[props.articleNum].url);
    }
    useEffect( ()=> {
        fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`)
        .then((result) => result.json())
        .then((data) => setValues(data))
        .catch((error) => console.log(error));
        // eslint-disable-next-line
    },[API_KEY]);
    return (
        <Box>
            <img src = {imgLink} alt = 'news story' width = '350' height = '300'/>
            <List
                sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <ListItemText sx = {{boxShadow: 6}}>
                        <Typography variant="body1" >
                            <Typography variant="body1" color="textPrimary" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                {title}
                            </Typography>
                            
                            <Typography variant="body2" color="textSecondary">
                                {author}
                            </Typography>
                        </Typography>
                    </ListItemText>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <Typography variant="body1" style={{ fontSize: '14px' }}>
                        {description}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant="body1" style={{ fontSize: '14px' }}>
                        Read the full story <a href= {storyLink}>here</a>
                    </Typography>
                </ListItem>
            </List>    
        </Box>
    );
}

export default NewsStory;