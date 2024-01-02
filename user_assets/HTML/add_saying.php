
<?php
include('header.php');  
include('db.php');

if(isset($_POST['submit'])=='submit')
{
  $content=$_POST['content'];
  $name=$_POST['name'];
  $city=$_POST['city'];
  $country=$_POST['country'];
  if(isset($_GET['action'])=='update')
    {
      $id=$_GET['id'];
      $h="select * from saying where `saying_id`='$id'";
      $h1=mysqli_query($con,$h);
      $h2=mysqli_fetch_array($h1);
      $que="update saying set `content`='$content',`name`='$name',`city`='$city',`country`='$country' where `saying_id`='$id'";
    }
    else
    {
       $que="insert into saying(`content`,`name`,`city`,`country`)values('$content','$name','$city','$country')";
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
    $qu="select * from saying where `saying_id`='$id'";
    $q1=mysqli_query($con,$qu);
    $q2=mysqli_fetch_array($q1);
    print_r($q2);
    


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
              <label class="control-label">content :</label>
              <div class="controls">
                <input type="text" name="content" value="<?php echo @$q2['content'];?>" placeholder="content" />
              </div>
            </div>
            <div class="control-group">
              <label class="control-label">name</label>
              <div class="controls">
                <input type="text" name="name" value="<?php echo @$q2['name'];?>"  />
              </div>
            </div>
             <div class="control-group">
              <label class="control-label">city</label>
              <div class="controls">
                <input type="radio" name="city" value="surat"<?php if(@$q2['city']=='surat') { ?> checked <?php } ?>  />surat
                <input type="radio" name="city" value="rajkot"<?php if(@$q2['city']=='rajkot') { ?> checked <?php } ?>   />rajkot
              </div>
            </div>
             <div class="control-group">
              <label class="control-label">country</label>
              <div class="controls">
                <input type="radio" name="country" value="india"<?php if(@$q2['country']=='india') { ?> checked <?php } ?> >INDIA
                 <input type="radio" name="country" value="usa"<?php if(@$q2['country']=='usa') { ?> checked <?php } ?> >usa
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