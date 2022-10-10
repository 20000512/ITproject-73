import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ItemCard = (props) => {
  return (
    <Card sx={{ width: '50%' }} {...props}>
      <CardMedia
        component="img"
        height="200"
        image={props.cover}
        alt=""
      />
      <CardContent sx={{ background: '#fabe51', p: '36px' }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCard;