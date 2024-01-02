<?php

include('db.php');
session_start();
if(@$_SESSION['admin_id']!='')
{
    header('location:dashboard.php');       
}
    if(@$_POST['submit']=='submit')
    {
        $email=$_POST['email'];
        $password=$_POST['password'];
        $user_type=$_POST['user_type'];
        $qu="select * from admin where `email`='$email' AND `password`='$password' AND `user_type`='user_type'";
        $qu1=mysqli_query($con,$qu);
        $qu2=mysqli_num_rows($qu1);
        if($qu2==1)
        {
           $qu3=mysqli_fetch_array($qu1);
            $_SESSION['admin_id']=$qu3['admin_id'];
             $_SESSION['user_type']=$qu3['user_type'];
            header("location:dashboard.php");
        }
        else
        {
            $msg="invalid email or password";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    
<head>
        <title>Matrix Admin</title><meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/bootstrap-responsive.min.css" />
        <link rel="stylesheet" href="css/matrix-login.css" />
        <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,800' rel='stylesheet' type='text/css'>

    </head>
    <body>
        <div id="loginbox">            
            <form id="loginform" class="form-vertical" method="post">
				 <div class="control-group normal_text"> <h3><img src="img/logo.png" alt="Logo" /></h3></div>
                <div style="color:pink; font-size: 20px;text-align: center;"><?php echo @$msg ?>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lg"><i class="icon-user"> </i></span>
                            <input type="text" name="email" placeholder="Username" />
                        </div>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_ly"><i class="icon-lock"></i></span>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                    </div>
                </div>
                  <div class="control-group">
                    <div class="controls" style="text-align: center;font-size: 30px;">
                            <input type="radio" name="user_type" value="user" />user
                            <input type="radio" name="user_type" value="admin" />admin
                    </div>
                </div>
                <div class="form-actions">
                    <span class="pull-left"><a href="#" class="flip-link btn btn-info" id="to-recover">Lost password?</a></span>
                    <span class="pull-right"><input type="submit" name="submit" value="submit" class="btn btn-success" /></span>
                </div>
            </form>
            <form id="recoverform" action="#" class="form-vertical">
				<p class="normal_text">Enter your e-mail address below and we will send you instructions how to recover a password.</p>
				
                    <div class="controls">
                        <div class="main_input_box">
                            <span class="add-on bg_lo"><i class="icon-envelope"></i></span><input type="text" placeholder="E-mail address" />
                        </div>
                    </div>
               
                <div class="form-actions">
                    <span class="pull-left"><a href="#" class="flip-link btn btn-success" id="to-login">&laquo; Back to login</a></span>
                    <span class="pull-right"><a class="btn btn-info"/>Reecover</a></span>
                </div>
            </form>
        </div>
        
        <script src="js/jquery.min.js"></script>  
        <script src="js/matrix.login.js"></script> 
    </body>

</html>
