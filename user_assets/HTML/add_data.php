
<?php
include('header.php');  
include('db.php');

if(isset($_POST['submit'])=='submit')
{
  $fname=$_POST['fname'];
  $lname=$_POST['lname'];
  $name=$fname." ".$lname;
  $password=$_POST['password'];
  $email=$_POST['email'];
  $gender=$_POST['gender'];
  $hobby=implode(',',$_POST['hobby']);
  $dob=$_POST['dob'];
  $image=$_FILES['image']['name'];
  move_uploaded_file($_FILES['image']['tmp_name'],"images/".$image);
  if(isset($_GET['action'])=='update')
    {
      $id=$_GET['id'];
      $h="select * from admin where `admin_id`='$id'";
      $h1=mysqli_query($con,$h);
      $h2=mysqli_fetch_array($h1);
      if(@$image=='')
      {
        $image=$h2['image'];
      }
      else
      {
        $ima=$h2['image'];
        unlink("images/".$ima);
      }
      $que="update admin set `name`='$name',`password`='$password',`email`='$email',`gender`='$gender',`hobby`='$hobby',`dob`='$dob',`image`='$image'where `admin_id`='$id'";
    }
    else
    {
       $que="insert into admin(`name`,`password`,`email`,`gender`,`hobby`,`dob`,`image`)values('$name','$password','$email','$gender','$hobby','$dob','$image')";
    }
  $que1=mysqli_query($con,$que);
  if($que1)
  {
    $msg= "data inserted";
  }
}
  if(isset($_GET['action'])=='update')
  {
    $id=$_GET['id'];
    $qu="select * from admin where `admin_id`='$id'";
    $q1=mysqli_query($con,$qu);
    $q2=mysqli_fetch_array($q1);
    $n=explode(' ',$q2['name']);
    $ho=explode(',',$q2['hobby']);


  }
?>




<div id="content">
<div id="content-header">
  <div id="breadcrumb"> <a href="index.html" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="tip-bottom">Form elements</a> <a href="#" class="current">Common elements</a> </div>
  <h1>Common Form Elements</h1>
</div>
<div class="container-fluid">
  <hr>
  <div class="row-fluid">
    <div class="span6">
      <div class="widget-box">
        <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
          <h5>Personal-info</h5>
        </div>
        <div class="widget-content nopadding">
          <?php echo @$msg ?>
          <form  method="post" class="form-horizontal" enctype="multipart/form-data">
            <div class="control-group">
              <label class="control-label">First Name :</label>
              <div class="controls">
                <input type="text" name="fname" value="<?php echo @$n[0];?>" placeholder="First name" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Last Name :</label>
              <div class="controls">
                <input type="text" name="lname" value="<?php echo @$n[1];?>" placeholder="Last name" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Password </label>
              <div class="controls">
                <input type="password"  name="password" value="<?php echo @$q2['password'];?>" placeholder="Enter Password"  />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Enter email</label>
              <div class="controls">
                <input type="text" name="email" value="<?php echo @$q2['email'];?>" placeholder="Enter email" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Select gender</label>
              <div class="controls">
                <input type="radio" name="gender" value="male"<?php if(@$q2['gender']=='male'){ ?>checked <?php } ?>>male
                <input type="radio" name="gender" value="male"<?php if(@$q2['gender']=='female'){ ?>checked <?php } ?>>female
               </div>
            </div>
            <div class="control-group">
              <label class="control-label">Select hobby</label>
              <div class="controls">
                <input type="checkbox" name="hobby[]" value="reading"<?php if(@in_array('reading',$ho)){ ?> checked <?php } ?> />reading
                <input type="checkbox" name="hobby[]" value="learning"<?php if(@in_array('learning',$ho)){?> checked <?php } ?> />learning
                <input type="checkbox" name="hobby[]" value="writing"<?php if(@in_array('writing',$ho)){?> checked <?php } ?> />writing
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">dob</label>
              <div class="controls">
                <input type="date" name="dob" value="<?php echo @$q2['dob'];?>" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">Select image</label>
              <div class="controls">
                <input type="file" name="image"  />
                <img src="images/<?php echo @$q2['image']; ?>" height="50" width="50">
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-success" name="submit" value="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
     
<?php

include('footer.php');

?>