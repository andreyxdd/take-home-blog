import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'See source code at '}
      <Link color="inherit" href="https://github.com/andreyxdd/take-home-blog-nodejs">
        Github
      </Link>
    </Typography>
  );
}

export default Copyright;
