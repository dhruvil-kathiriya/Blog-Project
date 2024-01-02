
<?php
include('header.php');  
include('db.php');

if(isset($_POST['submit'])=='submit')
{
  $title=$_POST['title'];
  $content=$_POST['content'];
 $icon=$_POST['icon'];
  
  if(isset($_GET['action'])=='update')
    {
      $id=$_GET['id'];
      $h="select * from offer where `offer_id`='$id'";
      $h1=mysqli_query($con,$h);
      $h2=mysqli_fetch_array($h1);
      $que="update offer set `title`='$title',`content`='$content',`icon`='$icon'where `offer_id`='$id'";
    }
    else
    {
       $que="insert into offer(`title`,`content`,`icon`)values('$title','$content','$icon')";
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
    $qu="select * from offer where `offer_id`='$id'";
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
              <label class="control-label">icon</label>
              <div class="controls">
                <input type="text" name="icon" value="<?php echo @$q2['icon'];?>" placeholder="icon" />
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