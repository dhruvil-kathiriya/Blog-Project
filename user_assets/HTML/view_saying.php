
<?php
include('header.php');
include('db.php');
$que="select * from saying";
$que1=mysqli_query($con,$que);

if(isset($_GET['action'])=='delete')
{
  $id=$_GET['id'];
  $q1="select * from saying where `saying_id`='$id'";
  $q2=mysqli_query($con,$q1);
  $q3=mysqli_fetch_array($q2);
  $q4="delete from saying where `saying_id`='$id'";
  mysqli_query($con,$q4);
}


?>
<div id="content">
  <div id="content-header">
    <div id="breadcrumb"> <a href="#" title="Go to Home" class="tip-bottom"><i class="icon-home"></i> Home</a> <a href="#" class="current">Tables</a> </div>
    <h1>Tables</h1>
  </div>
  <div class="container-fluid">
    <hr>
    <div class="row-fluid">
      <div class="span12">
        <div class="widget-box">
          <div class="widget-title"> <span class="icon"> <i class="icon-th"></i> </span>
            <h5>Static table</h5>
          </div>
          <div class="widget-content nopadding">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>saying_id</th>
                  <th>content</th> 
                  <th>name</th>
                  <th>city</th>
                  <th>country</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                <?php while($que2=mysqli_fetch_array($que1)) { ?>
                <tr>
                  <td><?php echo $que2['saying_id'] ?></td>
                  <td><?php echo $que2['content'] ?></td>
                  <td><?php echo $que2['name'] ?></td>
                  <td><?php echo $que2['city'] ?></td>
                   <td><?php echo $que2['country'] ?></td>
                  <td><a href="view_saying.php?action=delete&id=<?php echo $que2['saying_id']; ?>"<i class="fa fa-trash w3-large"></i>
                  ||
                  <a href="add_saying.php?action=update&id=<?php echo $que2['saying_id']; ?>"<i class="fa fa-cloud w3-large"></i>
                </td>
                </tr>
              <?php } ?>
              </tbody>
            </table>
          </div>
        </div>
        

<?php

include('footer.php');

?>