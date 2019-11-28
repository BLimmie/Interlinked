package app

import "os/exec"

func RunCommand(cmd exec.Cmd) error {
	err := cmd.Start()
	return err
}
