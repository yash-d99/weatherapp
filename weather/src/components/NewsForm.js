import NewsStory from './NewsStory';
import  Grid  from '@mui/material/Grid';
function NewsForm() {
    const newsList = [];
    for (let i = 0; i < 8; i ++) {
    newsList.push(
    <NewsStory articleNum = {i}/>
    );
}
    return (
        <Grid container spacing = {0}>
        
        {newsList.map((newsArticle) => {
            return (
                <Grid sx={{
                    width: 350,
                    height: 600,
                    color: 'black',
                    //backgroundColor: 'primary.dark',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}> 
                  {newsArticle} 
                </Grid>
            );
        })
        }
    </Grid>
    );
}

export default NewsForm;