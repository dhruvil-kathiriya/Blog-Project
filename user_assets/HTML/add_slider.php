
<?php
include('header.php');  
include('db.php');

if(isset($_POST['submit'])=='submit')
{
  $title=$_POST['title'];
  $content=$_POST['content'];
  $image=$_FILES['image']['name'];
  move_uploaded_file($_FILES['image']['tmp_name'],"images/".$image);
  if(isset($_GET['action'])=='update')
    {
      $id=$_GET['id'];
      $h="select * from slider where `slider_id`='$id'";
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
      $que="update slider set `title`='$title',`content`='$content',`image`='$image'where `slider_id`='$id'";
    }
    else
    {
       $que="insert into slider(`title`,`content`,`image`)values('$title','$content','$image')";
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
    $qu="select * from slider where `slider_id`='$id'";
    $q1=mysqli_query($con,$qu);
    $q2=mysqli_fetch_array($q1);
    


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
              <label class="control-label">title :</label>
              <div class="controls">
                <input type="text" name="title" value="<?php echo @$q2['title'];?>" placeholder="title" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">content :</label>
              <div class="controls">
                <input type="text" name="content" value="<?php echo @$q2['content'];?>" placeholder="content" />
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